require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest
    test 'respond with error when usernameis invalid' do
        post "session",  user: { email: "testemail@test.com", password: "fakepassword" }
        assert_response :unprocessable_entity
    end

    test 'should be able to create a session' do
        user_info = users(:julian)
        user_info = { email: user_info.email, password: "test_password" }
        user = User.find_by_credentials(user_info[:email], user_info[:password])
        saved_token = user.session_token
        post "session",  user: user_info
        assert_response :ok
        puts "successfully signed in with response: #{response}"
        puts "session: #{session[:session_token]}"
        assert session[:session_token], "session token exists"
        assert session[:session_token] != saved_token, "generated new token"
        assert @response, "response exists"
        puts "cookies : #{cookies.inspect()}"
        assert cookies
    end

    test 'should be able to delete a session' do
        delete "session"
        assert_response :bad_request
        user_info = { email: "julian2@sunnyvale.com", password: "test_password" }
        post "session",  user: user_info
        assert_response :ok
        delete "session"
        assert_response :ok
    end
end
