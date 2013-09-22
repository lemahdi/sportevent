module ApplicationHelper

	# Returns the full title on a per-page basis
	def full_title(page_title)
		base_title = "Sport In The City"
		if page_title.empty?
			base_title
		else
			"#{base_title} | #{page_title}"
		end
	end

	# Overwrite will_paginate to specify previous and next labels
	def will_paginate(list)
		will_paginate list, previous_label: I18n.t(:previous, scope: 'custom.form'), next_label: I18n.t(:next, scope: 'custom.form')
	end
end
