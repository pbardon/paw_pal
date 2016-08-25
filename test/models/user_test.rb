require 'test_helper'

class UserTest < ActiveSupport::TestCase
    
    test 'should_create_a_password' do
        jim = users(:jim)
        user = User.new({name: jim.name,
                         email: jim.email,
                         session_token: jim.session_token
                        })
        assert_nil(user.password_digest)
        user.password='test_password'
        assert_not_nil(user.password_digest)
    end

    test 'should be able to save to database' do
        user = create_user('Test User', 'test@testspace.com', 'test_password')
        assert user.save
    end

    test 'should be able to find by credentials' do
        jim = users(:jim)
        found_user = User.find_by_credentials(jim.email, 'test_password')
        assert found_user.email == jim.email
    end

    test 'should reset session_token' do
        julian = users(:julian)
        found_user = User.find_by_credentials(julian.email, 'test_password')
        save_token = found_user.session_token
        found_user.reset_session_token!
        assert save_token != found_user.session_token
    end

    test 'should ensure_session_token on creation' do
        jim = users(:jim)
        user = User.new({ name: jim.name,
                          email: jim.email})
        assert user.session_token
    end

    test 'should have many dogs' do
        bob = users(:bob)
        user = User.find_by_credentials(bob.email, 'test_password')
        assert user.save
        assert user.dogs.empty?
        dog1 = Dog.new({ name: 'Loki', age: 5, size: 'medium', description: 'white dog'})
        dog1.owner_id = user.id
        assert dog1.save
        assert !user.dogs.empty?
        dog1 = Dog.new({ name: 'Paddington', age: 5, size: 'large', description: 'white fluffy dog'})
        dog1.owner_id = user.id
        assert dog1.save
        assert user.dogs.length == 2
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
