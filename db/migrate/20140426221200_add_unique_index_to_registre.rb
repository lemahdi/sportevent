class AddUniqueIndexToRegistre < ActiveRecord::Migration
  def change
    add_index :registres, [:user_id, :match_id], unique: true
  end
end
