class Dog < ActiveRecord::Base
  validates :name, :age, :size, :description, :owner_id, presence: true
  # validates :size, inclusion: { in: %w(small, medium, large) }

  belongs_to :owner, class_name: :User, foreign_key: :owner_id
end
