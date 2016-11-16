require 'rails_helper'

RSpec.describe Dog, type: :model do

    it 'should validate size' do
        dog = build(:dog)
        dog.size = 'yellow'
        dog.validate
        expect(dog.errors.full_messages[0]).to eq('Size is not included in the list')
    end

    it 'should save record to db' do
        dog = create(:dog)
        expect(dog.id).to be_an Integer
        expect(dog.owner_id).to be_an Integer
        user = build(:user)
        expect(dog.owner.name).to eq(user.name)
    end

    it 'should have an owner' do
        dog = create(:dog)
        expect(dog.owner).to be_a(User)
    end

    it 'should allow comments' do
        dog = create(:dog_with_comments)
        expect(dog.comments.length).to eq(5)
    end

    it 'should be able to attach an image' do
        dog = create(:dog_with_photo)
        dog.dog_photo = sample_file('dog1.jpeg')
        expect(dog.dog_photo_updated_at).to_not be(nil)
        expect(dog.dog_photo_content_type).to eq('image/jpeg')
    end
end