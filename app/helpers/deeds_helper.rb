module DeedsHelper
  def deeds_json
    {
      :total_entries => @deeds.total_entries,
      :total_pages => @deeds.total_pages,
      :per_page => @deeds.per_page,
      :current_page => @deeds.current_page,
      :deeds => @deeds.collect do |d|
        {
          'id' => d.id,
          'speaker' => d.speaker,
          'text' => d.text,
          'performed_at' => d.performed_at.to_i
        }
      end
    }.to_json
  end
end
