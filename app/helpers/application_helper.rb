module ApplicationHelper
  def jquery_template(id, options = {})
    options.symbolize_keys!.merge!(:id => id, :type => "text/x-jquery-tmpl")
    haml_tag :script, options do
      yield
    end
    haml_tag :script, :type => 'text/javascript' do
      haml_concat "$.template('#{id}', $('##{id}'));"
    end
  end
end
