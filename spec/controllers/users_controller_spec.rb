require 'rails_helper'

RSpec.describe UsersController, type: :controller do
    describe 'POST #users' do
        it 'should be able to create a new user' do
            test_email = Faker::Internet.email
            post :create,  user: { email: test_email, password: 'fakepassword' }
            expect(response.status).to eq(200)
            puts "response : #{response.body}"
            response_body = JSON.parse(response.body)
            puts "response_body : #{response_body['token']}"
            expect(response_body['user']['email']).to eq(test_email)

        end

        it 'should not allow duplicate users' do
            post :create,  user: { email: 'testemail@test.com', password: 'fakepassword' }
            expect(response.status).to eq(200)
            post :create,  user: { email: 'testemail@test.com', password: 'fakepassword' }
            expect(response.status).to eq(400)
        end

    end
end
