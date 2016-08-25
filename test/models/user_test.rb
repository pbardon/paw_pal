require 'test_helper'

class UserTest < ActiveSupport::TestCase


  test 'should_create_a_password' do
    user = User.new({
      name: 'Jim Lahey',
      email: 'jim@sunnyvale.com',
      session_token: 'AAAAAAAAAAAAAAAAA'
    })
    assert_nil(user.password_digest)
    user.password='test_password'
    assert_not_nil(user.password_digest)
    log "user.password_digest : #{user.password_digest}"
  end

  test 'should be able to save to database' do
      user = create_user('test_password')
      assert user.save
  end

  test 'should be able to find by credentials' do
      user = create_user('test_password')
      assert user.save
      found_user = User.find_by_credentials(user.email, user.password)
      assert found_user.email == user.email
  end

  test 'should reset session_token' do
      user = create_user('test_password')
      assert user.save
      save_token = user.session_token
      user.reset_session_token!
      assert save_token != user.session_token
  end

  test 'should ensure_session_token on creation' do
      user = User.new({
        name: 'Jim Lahey',
        email: 'jim@sunnyvale.com'})
      assert user.session_token
  end

    test 'should have many dogs' do
        user = User.new({name: 'Randy Lahey',
                         email: 'randy@sunnyvale.com'})
        user.password = 'fakepasswd'
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

def create_user(password)
    user = User.new({
      name: 'Jim Lahey',
      email: 'jim@sunnyvale.com',
      session_token: 'AAAAAAAAAAAAAAAAA'
    })
    user.password=password
    user
end
