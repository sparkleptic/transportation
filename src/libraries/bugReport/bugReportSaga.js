// @flow

import {takeEvery, call} from 'redux-saga/effects';
import Raven from 'raven-js';

import libraryKeys from '../../constants/libraryKeys';
import type {BugReportAction} from './BugReport-type';

// Raven.config('https://__KEY__@sentry.io/__PROJECT_ID__').install();
// NOTE: ENABLE below in Production
Raven.config(libraryKeys.sentry.DSN).install();

function captureError(error: Error) {
  Raven.captureException(error);
}

function* bugReportSagaWatcher(): Generator<*, *, *> {
  yield takeEvery('ERROR_OCCURRED', reportBugSaga);
}

function* reportBugSaga(action: BugReportAction): Generator<*, *, *> {
  yield call(captureError, action.error);
}

export {bugReportSagaWatcher, reportBugSaga};
