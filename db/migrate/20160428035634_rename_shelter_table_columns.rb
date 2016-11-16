class RenameShelterTableColumns < ActiveRecord::Migration
  def change
      rename_column :shelters, :sitter_name, :shelter_name
      rename_column :shelters, :sitter_photo_file_name, :shelter_photo_file_name
      rename_column :shelters, :sitter_photo_content_type, :shelter_photo_content_type
      rename_column :shelters, :sitter_photo_file_size, :shelter_photo_file_size
      rename_column :shelters, :sitter_photo_updated_at, :shelter_photo_updated_at

      rename_column :bookings, :sitter_id, :shelter_id
  end
end
