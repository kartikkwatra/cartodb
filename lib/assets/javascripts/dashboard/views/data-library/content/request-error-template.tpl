<div class="IntermediateInfo">
  <div class="LayoutIcon LayoutIcon--negative">
    <i class="CDB-IconFont CDB-IconFont-info"></i>
  </div>
  <% if (msg) { %>
    <h4 class="CDB-Text CDB-Size-large u-mainTextColor u-secondaryTextColor u-bSpace--m u-tSpace-xl"><%= msg %></h4>
  <% } else { %>
    <h4 class="CDB-Text CDB-Size-large u-mainTextColor u-secondaryTextColor u-bSpace--m u-tSpace-xl">Oouch! There has been an error</h4>
  <% } %>
  <p class="CDB-Text CDB-Size-medium u-altTextColor">If the problem persists contact us at <a class="js-mail-link" href="mailto:support@carto.com">support@carto.com</a>.</p>
</div>
