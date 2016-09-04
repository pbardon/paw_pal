require 'rails_helper'

RSpec.describe User, type: :model do

    fixtures :users


    it 'should_create_a_password' do
        jim = users(:jim)
        user = User.new({name: jim.name,
                         email: jim.email,
                         session_token: jim.session_token
                        })
        assert_nil(user.password_digest)
        user.password='test_password'
        expect user.password_digest
    end

    it 'should be able to save to database' do
        user = create_user('Test User', 'test@testspace.com', 'test_password')
        expect user.save
    end

    it 'should be able to find by credentials' do
        jim = users(:jim)
        found_user = User.find_by_credentials(jim.email, 'test_password')
        expect(found_user.email).to eq(jim.email)
    end

    it 'should reset session_token' do
        julian = users(:julian)
        found_user = User.find_by_credentials(julian.email, 'test_password')
        save_token = found_user.session_token
        found_user.reset_session_token!
        expect(save_token).to_not eq(found_user.session_token)
    end

    it 'should ensure_session_token on creation' do
        jim = users(:jim)
        user = User.new({ name: jim.name,
                          email: jim.email})
        expect user.session_token
    end

    it 'should have many dogs' do
        bob = users(:bob)
        user = User.find_by_credentials(bob.email, 'test_password')
        expect user.save
        expect user.dogs.empty?
        dog1 = Dog.new({ name: 'Loki', age: 5, size: 'medium', description: 'white dog'})
        dog1.owner_id = user.id
        expect dog1.save
        expect(user.dogs.empty?).to_not be true
        dog1 = Dog.new({ name: 'Paddington', age: 5, size: 'large', description: 'white fluffy dog'})
        dog1.owner_id = user.id
        expect dog1.save
        expect(user.dogs.length).to eq(2)
    end

    it 'uses factory girl to create test user' do
        user = create(:user)
        expect(user.id).to be_an Integer
    end
end

def create_user(name, email, password)
    user = User.new({   name: name,
                        email: email,
                        session_token: 'AAAAAAAAAAAAAAAAA'
                    })
    user.password=password
    user
end
