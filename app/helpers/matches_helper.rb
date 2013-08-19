module MatchesHelper

	def fields_names
		fields = Field.all
		names = fields.map { |field| [field.name, field.id] }.select { |f| f }
	end
end
