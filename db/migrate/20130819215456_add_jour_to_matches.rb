class AddJourToMatches < ActiveRecord::Migration
  def up
    add_column :matches, :jour, :date
  end

  def down
  	remove_column :matches, :jour
  end
end
