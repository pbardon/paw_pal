class RenameSittersToShelters < ActiveRecord::Migration
  def change
      rename_table :sitters, :shelters
  end
end
