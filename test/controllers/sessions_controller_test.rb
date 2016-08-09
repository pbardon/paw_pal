require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest
    test "respond with error when usernameis invalid" do
        post "session",  session: { email: "testemail@test.com", password: "fakepassword" }
        assert_response :unprocessable_entity
    end

    test "should be able to create a session" do
        post "session",  session: { email: "julian@sunnyvale.com", password: "test_password" }
        assert_response :ok
        puts "successfully signed in with response: #{response}"
        assert @response.session_token, "session token exists"
    end

    test "should be able to delete a session" do
    end
end
