require 'test_helper'

class DogTest < ActiveSupport::TestCase

    test 'should save record to db' do
        dog = Dog.new({name: 'Loki'})
    end

end