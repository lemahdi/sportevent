class AddUniqueIndexToContract < ActiveRecord::Migration
  def change
    add_index :contracts, [:user_id, :group_id], unique: true
  end
end
