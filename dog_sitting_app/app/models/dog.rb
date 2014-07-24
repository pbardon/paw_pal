class Dog < ActiveRecord::Base
  validates :name, :age, :size, :description, :owner_id, presence: true
  # validates :size, inclusion: { in: %w(small, medium, large) }

  belongs_to :owner, class_name: :User, foreign_key: :owner_id

  has_attached_file :dog_photo, styles: {
    big: "600x600>",
    small: "50x50#"
  }

end
