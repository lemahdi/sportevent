class ChangeStartInMatch < ActiveRecord::Migration
  def up
  	change_table :matches do |t|
  		t.change :start, :string
  	end
  end

  def down
  	change_table :matches do |t|
  		t.change :start, :date
  	end
  end
end
