class Sitter < ActiveRecord::Base
  validates :user_id, :avg_rating, :sitter_name, :description, :price, presence: true
  validates :avg_rating, presence: true

  belongs_to :user

  has_attached_file :sitter_photo, styles: {
    big: "600x600>",
    small: "50x50#"
  }


  validates_attachment :sitter_photo,
  :content_type => { :content_type => ["image/jpeg", "image/gif", "image/png"] }


end
