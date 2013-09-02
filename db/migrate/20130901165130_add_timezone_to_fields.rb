class AddTimezoneToFields < ActiveRecord::Migration  
  def up
    add_column :fields, :timezone, :string, default: "UTC"
  end

  def down
  	remove_column :fields, :timezone
  end
end
