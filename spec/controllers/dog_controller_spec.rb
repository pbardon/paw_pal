require 'rails_helper'

RSpec.describe Api::DogsController, type: :controller do
    describe 'POST #dogs' do
        it 'should be able to create a new dog' do
            user_info = create(:user)
            token = user_info.session_token
            request.headers['X-PP-TOKEN'] = token
            post :create, dog: { name: 'Sparky', size: 'medium', age: 5, description: 'nice dog' }
            expect(response.status).to eq(200)
        end
    end
end