class Comment < ActiveRecord::Base
  validates :commentable_id, :commentable_type, :user_id, :comment_date, :rating, :comment, presence: true

  belongs_to :user

  belongs_to :commentable, polymorphic: true

  belongs_to :dog, polymorphic: true
end
