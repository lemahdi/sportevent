class AddNameToField < ActiveRecord::Migration
  def up
    add_column :fields, :name, :string
  end

  def down
  	remove_column :fields, :name
  end
end
