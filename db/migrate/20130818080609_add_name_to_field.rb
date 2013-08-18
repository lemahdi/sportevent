class AddNameToField < ActiveRecord::Migration
  def up
    add_column :fields, :name, :string, default: "Trou Noir"
  end

  def down
  	remove_column :fields, :name
  end
end
