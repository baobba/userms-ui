#!/bin/bash

# Adds stylesheets to the ionic app.
echo '
/* Used by Autocrud 2 plugin */
@import "../plugins/autocrud2/templates/listing";
@import "../plugins/autocrud2/templates/autocrud";
' >> ../../theme/app.core.scss

# Copies images to /www/img/autocrud2 folder.
mkdir ../../../www/img/autocrud2
cp .resources/imgs/* ../../../www/img/autocrud2/

# Delete .resources folder as it has been already copied.
rm -r .resources

# Delete this script after run
rm -- "$0"
