class AddZoneToFields < ActiveRecord::Migration
  def up
    add_column :fields, :zone, :string, default: "+00:00"
  end

  def down
  	remove_column :fields, :zone
  end
end
