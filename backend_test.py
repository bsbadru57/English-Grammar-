#!/usr/bin/env python3
"""
Backend API Testing for English Grammar Books Website
Tests all backend endpoints based on test_result.md requirements
"""

import requests
import json
import sys
from datetime import datetime
import uuid

# Get backend URL from frontend .env file
BACKEND_URL = "https://e1b71791-a79a-4d70-b795-1c3b56418d1e.preview.emergentagent.com/api"

class BackendTester:
    def __init__(self):
        self.base_url = BACKEND_URL
        self.test_results = []
        self.created_order_id = None
        
    def log_test(self, test_name, success, message, details=None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "message": message,
            "timestamp": datetime.now().isoformat(),
            "details": details
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name}")
        print(f"   {message}")
        if details:
            print(f"   Details: {details}")
        print()

    def test_api_root(self):
        """Test API root endpoint"""
        try:
            response = requests.get(f"{self.base_url}/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                self.log_test(
                    "API Root Endpoint",
                    True,
                    f"API is accessible and responding correctly",
                    f"Response: {data}"
                )
                return True
            else:
                self.log_test(
                    "API Root Endpoint",
                    False,
                    f"API returned status code {response.status_code}",
                    f"Response: {response.text}"
                )
                return False
        except Exception as e:
            self.log_test(
                "API Root Endpoint",
                False,
                f"Failed to connect to API: {str(e)}"
            )
            return False

    def test_plans_api(self):
        """Test GET /api/plans endpoint for updated plan content"""
        try:
            response = requests.get(f"{self.base_url}/plans", timeout=10)
            
            if response.status_code != 200:
                self.log_test(
                    "Plans API - GET /api/plans",
                    False,
                    f"API returned status code {response.status_code}",
                    f"Response: {response.text}"
                )
                return False
            
            data = response.json()
            
            # Check response structure
            if not data.get("success"):
                self.log_test(
                    "Plans API - Response Structure",
                    False,
                    "API response does not have success=true",
                    f"Response: {data}"
                )
                return False
            
            plans = data.get("data", [])
            if not plans:
                self.log_test(
                    "Plans API - Data Content",
                    False,
                    "No plans returned from API"
                )
                return False
            
            # Verify we have the expected 3 plans
            if len(plans) != 3:
                self.log_test(
                    "Plans API - Plan Count",
                    False,
                    f"Expected 3 plans, got {len(plans)}",
                    f"Plans: {[p.get('name') for p in plans]}"
                )
                return False
            
            # Check for expected plan names and pricing
            expected_plans = {
                "Basic Plan": 2.0,
                "Expert Plan": 5.0, 
                "Legend Plan": 15.0
            }
            
            found_plans = {}
            speaking_focused_features = 0
            
            for plan in plans:
                name = plan.get("name")
                price = plan.get("price")
                currency = plan.get("currency")
                features = plan.get("features", [])
                description = plan.get("description", "")
                
                found_plans[name] = price
                
                # Check currency is $
                if currency != "$":
                    self.log_test(
                        f"Plans API - Currency Check ({name})",
                        False,
                        f"Expected currency '$', got '{currency}'"
                    )
                    return False
                
                # Check for speaking-focused content
                speaking_keywords = ["speaking", "confidence", "fluency", "conversation", "pronunciation", "native"]
                plan_text = (description + " " + " ".join(features)).lower()
                
                if any(keyword in plan_text for keyword in speaking_keywords):
                    speaking_focused_features += 1
            
            # Verify plan prices match expected values
            for expected_name, expected_price in expected_plans.items():
                if expected_name not in found_plans:
                    self.log_test(
                        "Plans API - Plan Names",
                        False,
                        f"Missing expected plan: {expected_name}",
                        f"Found plans: {list(found_plans.keys())}"
                    )
                    return False
                
                if found_plans[expected_name] != expected_price:
                    self.log_test(
                        "Plans API - Plan Pricing",
                        False,
                        f"{expected_name}: Expected ${expected_price}, got ${found_plans[expected_name]}"
                    )
                    return False
            
            # Check if plans have speaking-focused content
            if speaking_focused_features < 2:
                self.log_test(
                    "Plans API - Speaking Focus",
                    False,
                    f"Only {speaking_focused_features} plans have speaking-focused content, expected at least 2"
                )
                return False
            
            self.log_test(
                "Plans API - Complete Test",
                True,
                f"All 3 plans returned with correct pricing in $ currency and speaking-focused features",
                f"Plans: {list(found_plans.keys())}, Speaking-focused: {speaking_focused_features}/3"
            )
            return True
            
        except Exception as e:
            self.log_test(
                "Plans API - GET /api/plans",
                False,
                f"Exception occurred: {str(e)}"
            )
            return False

    def test_orders_creation(self):
        """Test POST /api/orders endpoint"""
        try:
            # First get a plan ID to use for order creation
            plans_response = requests.get(f"{self.base_url}/plans", timeout=10)
            if plans_response.status_code != 200:
                self.log_test(
                    "Orders API - Setup",
                    False,
                    "Could not fetch plans for order creation test"
                )
                return False
            
            plans_data = plans_response.json()
            plans = plans_data.get("data", [])
            if not plans:
                self.log_test(
                    "Orders API - Setup",
                    False,
                    "No plans available for order creation test"
                )
                return False
            
            # Use the first plan for testing
            test_plan = plans[0]
            plan_id = test_plan.get("id")
            
            # Create test order data
            order_data = {
                "customerEmail": "sarah.johnson@email.com",
                "customerName": "Sarah Johnson",
                "planId": plan_id,
                "upiTransactionId": f"UPI{uuid.uuid4().hex[:8].upper()}",
                "notes": "Test order for English speaking improvement"
            }
            
            # Make POST request to create order
            response = requests.post(
                f"{self.base_url}/orders",
                json=order_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code != 200:
                self.log_test(
                    "Orders API - POST /api/orders",
                    False,
                    f"Order creation failed with status {response.status_code}",
                    f"Response: {response.text}"
                )
                return False
            
            response_data = response.json()
            
            # Check response structure
            if not response_data.get("success"):
                self.log_test(
                    "Orders API - Response Structure",
                    False,
                    "Order creation response does not have success=true",
                    f"Response: {response_data}"
                )
                return False
            
            order_info = response_data.get("data", {})
            order_id = order_info.get("orderId")
            
            if not order_id:
                self.log_test(
                    "Orders API - Order ID",
                    False,
                    "No orderId returned in response",
                    f"Response data: {order_info}"
                )
                return False
            
            # Store order ID for retrieval test
            self.created_order_id = order_id
            
            self.log_test(
                "Orders API - POST /api/orders",
                True,
                f"Order created successfully with ID: {order_id}",
                f"Plan: {test_plan.get('name')}, Customer: {order_data['customerName']}"
            )
            return True
            
        except Exception as e:
            self.log_test(
                "Orders API - POST /api/orders",
                False,
                f"Exception occurred: {str(e)}"
            )
            return False

    def test_orders_retrieval(self):
        """Test GET /api/orders/{orderId} endpoint"""
        if not self.created_order_id:
            self.log_test(
                "Orders API - GET /api/orders/{orderId}",
                False,
                "No order ID available for retrieval test (order creation may have failed)"
            )
            return False
        
        try:
            response = requests.get(f"{self.base_url}/orders/{self.created_order_id}", timeout=10)
            
            if response.status_code != 200:
                self.log_test(
                    "Orders API - GET /api/orders/{orderId}",
                    False,
                    f"Order retrieval failed with status {response.status_code}",
                    f"Order ID: {self.created_order_id}, Response: {response.text}"
                )
                return False
            
            data = response.json()
            
            # Check response structure
            if not data.get("success"):
                self.log_test(
                    "Orders API - Retrieval Response Structure",
                    False,
                    "Order retrieval response does not have success=true",
                    f"Response: {data}"
                )
                return False
            
            order = data.get("data", {})
            
            # Verify order details
            required_fields = ["orderId", "customerEmail", "customerName", "planId", "amount", "currency", "paymentStatus"]
            missing_fields = []
            
            for field in required_fields:
                if field not in order:
                    missing_fields.append(field)
            
            if missing_fields:
                self.log_test(
                    "Orders API - Order Data Completeness",
                    False,
                    f"Missing required fields in order data: {missing_fields}",
                    f"Order data: {order}"
                )
                return False
            
            # Verify order ID matches
            if order.get("orderId") != self.created_order_id:
                self.log_test(
                    "Orders API - Order ID Match",
                    False,
                    f"Retrieved order ID {order.get('orderId')} does not match created order ID {self.created_order_id}"
                )
                return False
            
            # Verify currency is $
            if order.get("currency") != "$":
                self.log_test(
                    "Orders API - Currency Check",
                    False,
                    f"Expected currency '$', got '{order.get('currency')}'"
                )
                return False
            
            self.log_test(
                "Orders API - GET /api/orders/{orderId}",
                True,
                f"Order retrieved successfully",
                f"Order ID: {order.get('orderId')}, Customer: {order.get('customerName')}, Amount: ${order.get('amount')}"
            )
            return True
            
        except Exception as e:
            self.log_test(
                "Orders API - GET /api/orders/{orderId}",
                False,
                f"Exception occurred: {str(e)}"
            )
            return False

    def test_testimonials_api(self):
        """Test GET /api/testimonials endpoint"""
        try:
            response = requests.get(f"{self.base_url}/testimonials", timeout=10)
            
            if response.status_code != 200:
                self.log_test(
                    "Testimonials API - GET /api/testimonials",
                    False,
                    f"API returned status code {response.status_code}",
                    f"Response: {response.text}"
                )
                return False
            
            data = response.json()
            
            # Check response structure
            if not data.get("success"):
                self.log_test(
                    "Testimonials API - Response Structure",
                    False,
                    "API response does not have success=true",
                    f"Response: {data}"
                )
                return False
            
            testimonials = data.get("data", [])
            
            # Check if testimonials are returned (may be empty, which is okay)
            if not isinstance(testimonials, list):
                self.log_test(
                    "Testimonials API - Data Type",
                    False,
                    f"Expected testimonials data to be a list, got {type(testimonials)}"
                )
                return False
            
            # If testimonials exist, check their structure
            speaking_focused_testimonials = 0
            if testimonials:
                for testimonial in testimonials:
                    required_fields = ["name", "location", "rating", "text"]
                    missing_fields = []
                    
                    for field in required_fields:
                        if field not in testimonial:
                            missing_fields.append(field)
                    
                    if missing_fields:
                        self.log_test(
                            "Testimonials API - Testimonial Structure",
                            False,
                            f"Missing required fields in testimonial: {missing_fields}",
                            f"Testimonial: {testimonial}"
                        )
                        return False
                    
                    # Check for speaking-focused content
                    testimonial_text = testimonial.get("text", "").lower()
                    speaking_keywords = ["speaking", "confidence", "fluency", "conversation", "pronunciation", "english"]
                    
                    if any(keyword in testimonial_text for keyword in speaking_keywords):
                        speaking_focused_testimonials += 1
            
            self.log_test(
                "Testimonials API - GET /api/testimonials",
                True,
                f"Testimonials API working correctly. Found {len(testimonials)} testimonials",
                f"Speaking-focused testimonials: {speaking_focused_testimonials}/{len(testimonials)}" if testimonials else "No testimonials in database yet"
            )
            return True
            
        except Exception as e:
            self.log_test(
                "Testimonials API - GET /api/testimonials",
                False,
                f"Exception occurred: {str(e)}"
            )
            return False

    def test_error_handling(self):
        """Test API error handling"""
        try:
            # Test invalid plan ID
            response = requests.get(f"{self.base_url}/plans/invalid_id", timeout=10)
            if response.status_code not in [400, 404, 500]:
                self.log_test(
                    "Error Handling - Invalid Plan ID",
                    False,
                    f"Expected error status code (400/404/500), got {response.status_code}"
                )
                return False
            
            # Test invalid order ID
            response = requests.get(f"{self.base_url}/orders/invalid_order_id", timeout=10)
            if response.status_code not in [400, 404, 500]:
                self.log_test(
                    "Error Handling - Invalid Order ID",
                    False,
                    f"Expected error status code (400/404/500), got {response.status_code}"
                )
                return False
            
            # Test invalid order creation (missing required fields)
            invalid_order = {"customerEmail": "invalid-email"}
            response = requests.post(
                f"{self.base_url}/orders",
                json=invalid_order,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            if response.status_code not in [400, 422, 500]:
                self.log_test(
                    "Error Handling - Invalid Order Data",
                    False,
                    f"Expected error status code (400/422/500), got {response.status_code}"
                )
                return False
            
            self.log_test(
                "Error Handling - API Error Responses",
                True,
                "API properly handles invalid requests with appropriate error codes"
            )
            return True
            
        except Exception as e:
            self.log_test(
                "Error Handling - API Error Responses",
                False,
                f"Exception occurred: {str(e)}"
            )
            return False

    def run_all_tests(self):
        """Run all backend tests"""
        print("=" * 80)
        print("ENGLISH GRAMMAR BOOKS - BACKEND API TESTING")
        print("=" * 80)
        print(f"Testing backend at: {self.base_url}")
        print(f"Test started at: {datetime.now().isoformat()}")
        print()
        
        # Run tests in order
        tests = [
            self.test_api_root,
            self.test_plans_api,
            self.test_orders_creation,
            self.test_orders_retrieval,
            self.test_testimonials_api,
            self.test_error_handling
        ]
        
        passed = 0
        total = len(tests)
        
        for test in tests:
            if test():
                passed += 1
        
        print("=" * 80)
        print("TEST SUMMARY")
        print("=" * 80)
        print(f"Total Tests: {total}")
        print(f"Passed: {passed}")
        print(f"Failed: {total - passed}")
        print(f"Success Rate: {(passed/total)*100:.1f}%")
        print()
        
        if passed == total:
            print("🎉 ALL TESTS PASSED! Backend is working correctly.")
        else:
            print("⚠️  Some tests failed. Check the details above.")
        
        return passed == total

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)