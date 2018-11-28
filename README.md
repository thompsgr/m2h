# m2h

m2h is a cli tool that converts markdown to html using the excellent showdown package.

Install m2h globally, and then use it from anywhere:

    $ npm install -g @avaion/m2h

To use, just specify the input directory (where the markdown files reside) and the output directory (where you want the HTML written).

    $ m2h path/to/markdown/dir path/to/html/dir

Right now, one HTML file will be written for every Markdown file. In addition, m2h will create a Table of Contents (toc.html) with links to all files generated.

WARNING: M2H WILL OVERWRITE ANY FILES OF THE SAME NAME THAT EXIST IN THE OUTPUT DIRECTORY, SO BE SURE YOU PROVIDE THE APPROPRIATE DIRECTORY.

