require 'rails_helper'

RSpec.describe Comment, type: :model do
    it 'should have content' do
        comment = create(:comment_on_dog)
        expect(comment.content.length).to_not eq(0)
        expect(comment.content).to be_a String
    end

    it 'should have a comment date' do
        comment = create(:comment_on_dog)
        expect(comment.comment_date).to be_a Date
    end

    it 'should be allowed to comment on dogs' do
        comment = create(:comment_on_dog)
        expect(comment.commentable_type).to eq('Dog')
    end

    it 'should be allowed to comment on shelters' do
        comment = create(:comment_on_shelter)
        expect(comment.commentable_type).to eq('Shelter')
    end
end