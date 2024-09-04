module.exports = ({env}) => ({
    'users-permissions': {
        config: {
            jwtSecret: env('JWT_SECRET')
        }
    },
    ckeditor: {
        enabled: true,
        config: {
            plugin: {
                // disable data-theme tag setting // 
                // setAttribute:false,

                // disable strapi theme, will use default ckeditor theme //
                // strapiTheme:false,

                // styles applied to editor container (global scope) //
                // styles:`
                // .ck.ck-editor__main .ck-focused{
                //   max-height: 700px;
                // }
                // :root{
                //   --ck-color-focus-border:red;
                //   --ck-color-text:red;
                // }
                // `
            },
            editor: { // editor default config

                // https://ckeditor.com/docs/ckeditor5/latest/features/markdown.html
                // if you need markdown support and output set: removePlugins: [''],
                // default is 
                // removePlugins: ['Markdown'],

                // https://ckeditor.com/docs/ckeditor5/latest/features/toolbar/toolbar.html
                placeholder: 'Type the content here...',
                toolbar: {
                    items: [
                        'heading',
                        '|',
                        'bold',
                        'italic',
                        'subscript',
                        'superscript',
                        'strikethrough',
                        'link',
                        'removeFormat',
                        '|',
                        'bulletedList',
                        'numberedList',
                        'horizontalLine',
                        'mathtype',
                        '|',
                        'indent',
                        'outdent',
                        '|',
                        'blockQuote',
                        'insertTable',
                        'StrapiMediaLib',
                        'mediaEmbed',
                        'undo',
                        'redo',
                    ]
                },
                // https://ckeditor.com/docs/ckeditor5/latest/features/font.html
                // https://ckeditor.com/docs/ckeditor5/latest/features/ui-language.html
                // default language: 'en',
                // https://ckeditor.com/docs/ckeditor5/latest/features/images/images-overview.html
                image: {
                    resizeUnit: "%",
                    resizeOptions: [{
                        name: 'resizeImage:original',
                        value: null,
                        icon: 'original'
                    },
                    {
                        name: 'resizeImage:25',
                        value: '25',
                        icon: 'small'
                    },
                    {
                        name: 'resizeImage:50',
                        value: '50',
                        icon: 'medium'
                    },
                    {
                        name: 'resizeImage:75',
                        value: '75',
                        icon: 'large'
                    }],
                    toolbar: [
                        'toggleImageCaption',
                        'imageTextAlternative',
                        'imageStyle:inline',
                        'imageStyle:block',
                        'imageStyle:side',
                        'linkImage',
                        'resizeImage:25', 'resizeImage:50', 'resizeImage:75', 'resizeImage:original'
                    ]
                },
                // https://ckeditor.com/docs/ckeditor5/latest/features/table.html
                table: {
                    contentToolbar: [
                        'tableColumn',
                        'tableRow',
                        'mergeTableCells',
                        'tableCellProperties',
                        'tableProperties',
                        'toggleTableCaption'
                    ]
                },
                // https://ckeditor.com/docs/ckeditor5/latest/features/headings.html
                heading: {
                    options: [
                        {model: 'paragraph', title: 'Paragraph'},
                        {model: 'heading1', view: 'h2', title: 'Heading 1'},
                        {model: 'heading2', view: 'h3', title: 'Heading 2'},
                        {model: 'heading3', view: 'h4', title: 'Heading 3'},
                        {model: 'heading4', view: 'h5', title: 'Heading 4'},
                    ]
                },
                // https://ckeditor.com/docs/ckeditor5/latest/features/general-html-support.html
                // Regular expressions (/.*/  /^(p|h[2-4])$/' etc) for htmlSupport does not allowed in this config
                htmlSupport: {
                    allow: [
                        {
                            name: 'img',
                            attributes: {
                                sizes: true,
                                loading: true,
                            }
                        },
                    ]
                },
            }
        }
    }
});