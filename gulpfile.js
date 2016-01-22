// npm install --save-dev gulp gulp-plumber gulp-watch gulp-livereload gulp-cssnano gulp-jshint jshint-stylish gulp-uglify gulp-rename gulp-notify gulp-include gulp-sass

var gulp = require('gulp'),
	plumber = require( 'gulp-plumber' ),
	watch = require( 'gulp-watch' ),
	livereload = require( 'gulp-livereload' ),
	minifycss = require( 'gulp-cssnano' ),
	jshint = require( 'gulp-jshint' ),
	stylish = require( 'jshint-stylish' ),
	uglify = require( 'gulp-uglify' ),
	rename = require( 'gulp-rename' ),
	notify = require( 'gulp-notify' ),
	include = require( 'gulp-include' ),
	sass = require( 'gulp-sass' );

var onError = function( err ) {
	console.log( 'An error occurred:', err.message );
	this.emit( 'end' );
}

/**
 * Paths to project folders
 */

var paths = {
    input: 'src/**/*',
    output: 'assets/',
    styles: {
        input: 'src/styles/**/*.{scss,sass}',
        output: 'assets/styles/'
    },
    scripts: {
        input: 'src/scripts/**/*.js',
        output: 'assets/scripts/'
    },
    svgs: {
        input: 'src/svg/*',
        output: 'assets/svg/'
    },
    images: {
        input: 'src/img/*',
        output: 'assets/img/'
    },
    test: {
        input: 'src/scripts/**/*.js',
        karma: 'test/karma.conf.js',
        spec: 'test/spec/**/*.js',
        coverage: 'test/coverage/',
        results: 'test/results/'
    },
    docs: {
        input: 'src/docs/*.{html,md,markdown}',
        output: 'docs/',
        templates: 'src/docs/_templates/',
        assets: 'src/docs/assets/**'
    }
};

gulp.task( 'styles', function() {
	return gulp.src( './src/styles/style.scss', {
		style: 'expanded'
	} )
	.pipe( plumber( { errorHandler: onError } ) )
	.pipe( sass() )
	.pipe( gulp.dest( paths.styles.output ) )
	.pipe( minifycss() )
	.pipe( rename( { suffix: '.min' } ) )
	.pipe( gulp.dest( paths.styles.output ) )
	.pipe( notify( { message: 'Styles task complete' } ) )
    .pipe( livereload() );
} );

gulp.task('scripts', function() {
  return gulp.src( './src/scripts/**/*.js' )
    .pipe( gulp.dest( paths.scripts.output ) )
    .pipe( rename( { suffix: '.min' } ) )
    .pipe( uglify() )
    .pipe( gulp.dest( paths.scripts.output ) )
    .pipe( notify( { message: 'Scripts task complete' } ) )
    .pipe( livereload() );
});

gulp.task( 'watch', function() {
	livereload.listen();
	gulp.watch( './src/styles/**/*.scss', [ 'styles' ] );
	gulp.watch( './src/scripts/**/*.js', [ 'scripts' ] );
	gulp.watch( './**/*.php' ).on( 'change', function( file ) {
		livereload.changed( file );
	} );
} );

gulp.task( 'default', [ 'styles', 'scripts', 'watch' ], function() {

} )