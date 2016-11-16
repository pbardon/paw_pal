require 'rails_helper'

RSpec.describe DogController, type: :controller do
    describe 'POST #dogs' do
        it 'should be able to create a new dog' do
            post :create,  dog: { name: 'testemail@test.com', size: 'fakepassword' }
            expect(response.status).to eq(200)
        end
    end
end