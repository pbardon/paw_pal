require 'rails_helper'

RSpec.describe Shelter, type: :model do
    it 'should be able to create a shelter account' do
        shelter = create(:shelter)
        expect(shelter.id).to be_an(Integer)

    end

    it 'should create a shelter account with a photo' do
        shelter = create(:shelter, :with_photo)
        expect(shelter.shelter_photo_content_type).to eq('image/jpeg')
    end

    it 'should be able to have comments' do
        shelter = create(:shelter, :with_comments)
        expect(shelter.comments.length).to_not eq(0)
    end
end