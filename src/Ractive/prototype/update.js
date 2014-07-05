import runloop from 'global/runloop';

export default function Ractive$update ( keypath, callback ) {
	var promise;

	if ( typeof keypath === 'function' ) {
		callback = keypath;
		keypath = '';
	} else {
		keypath = keypath || '';
	}

	promise = runloop.start( this, true );

	this.viewmodel.mark( keypath );
	runloop.end();

	this.fire( 'update', keypath );

	if ( callback ) {
		promise.then( callback.bind( this ) );
	}

	return promise;
}
