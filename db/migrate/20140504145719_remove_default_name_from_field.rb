class RemoveDefaultNameFromField < ActiveRecord::Migration
  def up
  	change_column :fields, :name, :string, default: ""
  end

  def down
    change_column :fields, :name, :string, default: "Trou Noir"
  end
end
