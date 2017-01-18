require 'rails_helper'

RSpec.describe SessionsController, type: :controller do

    describe 'POST #session' do
        it 'should respond with error when username is invalid' do
            post :create, { user: { email: 'testemail@test.com', password: 'fakepassword' } }
            assert_response :unprocessable_entity
        end

        it 'should be able to create a session' do
            user_info = create(:user)
            saved_token = user_info.session_token
            post :create,  user: { email: user_info.email, password: user_info.password }
            assert_response :ok
            response_body = JSON.parse(response.body)
            assert response_body['token'], "session token exists"
            assert response_body['token'] != saved_token, "generated new token"
        end
    end

    describe 'DELETE #session' do
        it 'should be able to delete a session' do
            delete :destroy
            assert_response :bad_request
            user = create(:user)
            token = user.session_token
            request.headers['X-PP-TOKEN'] = token
            delete :destroy
            assert_response :ok
        end
    end
end
