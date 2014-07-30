class SitterComment < ActiveRecord::Base
  validates :sitter_id, :user_id, :comment_date, :rating, :comment, presence: true

  belongs_to :user
  belongs_to :sitter
end
