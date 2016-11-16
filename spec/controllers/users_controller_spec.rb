require 'rails_helper'

RSpec.describe UsersController, type: :controller do
    describe 'POST #users' do
        it 'should be able to create a new user' do
            post :create,  user: { email: 'testemail@test.com', password: 'fakepassword' }
            expect(response.status).to eq(200)
            expect(session[:session_token].class).to be(String)

        end

        it 'should not allow duplicate users' do
            post :create,  user: { email: 'testemail@test.com', password: 'fakepassword' }
            expect(response.status).to eq(200)
            post :create,  user: { email: 'testemail@test.com', password: 'fakepassword' }
            expect(response.status).to eq(400)
        end

    end
end
