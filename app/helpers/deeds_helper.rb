module DeedsHelper
  def deeds_json
    resource = {:total => @deeds_resource.total_entries}
    resource[:deeds] = @deeds_resource.collect do |d|
      {
        'id' => d.id,
        'speaker' => d.speaker,
        'text' => d.text,
        'performed_at' => d.performed_at.to_i
      }
    end
    return resource.to_json
  end
end
