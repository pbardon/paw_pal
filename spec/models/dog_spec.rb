require 'rails_helper'

RSpec.describe Dog, type: :model do

    it 'should save record to db' do
        dog = create(:dog)
        expect(dog.id).to be_an Integer
        expect(dog.owner_id).to be_an Integer
        user = build(:user)
        expect(dog.owner.name).to eq(user.name)
    end

    it 'should be able to attach an image' do
        dog = create(:dog)
        dog.dog_photo = sample_file('dog1.jpeg')
        assert dog.dog_photo_updated_at != nil
        assert dog.dog_photo_content_type == 'image/jpeg'
    end
end