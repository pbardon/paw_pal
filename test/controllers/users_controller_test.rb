require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
    test 'should be able to create a new user' do
        post '/users',  user: { email: 'testemail@test.com', password: 'fakepassword' }
        assert_response :ok
        assert(session[:session_token].class == String, 'Response should contain session token')
    end

    test 'should not allow duplicate users' do
        post '/users',  user: { email: 'testemail@test.com', password: 'fakepassword' }
        assert_response :ok
        post '/users',  user: { email: 'testemail@test.com', password: 'fakepassword' }
        assert_response :bad_request
    end
end
