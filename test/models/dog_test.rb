require 'test_helper'

class DogTest < ActiveSupport::TestCase

    test 'should save record to db' do
        user = User.find_by_email(users(:julian).email)
        assert user
        dog = Dog.new({name: 'Loki'})
        dog.owner_id = user.id
        dog.size = 'medium'
        dog.description = 'test description'
        dog.age = 5
        assert dog.save
        dog = Dog.find_by name: 'Loki'
        assert dog, 'was not able to find dog'
        assert dog.created_at != nil
    end

    test 'should be able to attach an image' do
        user = User.find_by_email(users(:julian).email)
        assert user
        dog = Dog.new({name: 'Loki'})
        dog.owner_id = user.id
        dog.size = 'medium'
        dog.description = 'test description'
        dog.age = 5
        assert dog.save
        dog = Dog.find_by name: 'Loki'
        dog.dog_photo = sample_file('dog1.jpeg')
        assert dog.dog_photo_updated_at != nil
        assert dog.dog_photo_content_type == 'image/jpeg'
    end

end