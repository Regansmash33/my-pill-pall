 //Autocomplete drug name and strength for input
  /*   
    Please note the following code has been copied from:
    Lister Hill National Center for Biomedical Communications
    National Library of Medicine 
    Bethesda, MD 
    and is available at : http://lhncbc.nlm.nih.gov/project/lforms
  */

   // Create drug list for the name field
   new Def.Autocompleter.Search('rxterms',
   'https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?ef=STRENGTHS_AND_FORMS,RXCUIS');
   
 // Create an initially empty list for the strength field
 new Def.Autocompleter.Prefetch('drug_strengths', []);
   
 // Populate the strength list after the user selects a drug name
 Def.Autocompleter.Event.observeListSelections('rxterms', function() {
   var drugField = $('#rxterms')[0];
   var drugName = drugField.value;
   var drugAutocomp = drugField.autocomp;
   var strengths = drugAutocomp.getItemExtraData(drugName)['STRENGTHS_AND_FORMS'];
   var rxcuis = drugAutocomp.getItemExtraData(drugName)['RXCUIS'];
   if (strengths)
     $('#drug_strengths')[0].autocomp.setListAndField(strengths, rxcuis);
 });

 // Fill in the RxCUI field after the user selects a strength
 Def.Autocompleter.Event.observeListSelections('drug_strengths', function (data) {
   $('#rxcui')[0].value = data.item_code;
 });