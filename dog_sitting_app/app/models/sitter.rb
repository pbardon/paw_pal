class Sitter < ActiveRecord::Base
  validates :user_id, :avg_rating, :sitter_name, :description, :price, presence: true
  validates :avg_rating, presence: true

  belongs_to :user

end
