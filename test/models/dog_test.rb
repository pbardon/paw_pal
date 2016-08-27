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
        puts "user dogs: #{user.dogs.first.inspect}"
        dog = Dog.find_by name: 'Loki'
        puts "dog: #{dog}"
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
        puts "user dogs: #{user.dogs.first.inspect}"
        dog = Dog.find_by name: 'Loki'
        puts "dog: #{dog}"
        dog.dog_photo = sample_file('dog1.jpeg')
        puts "after attachment do if : #{dog.inspect}"
    end

end