// Declare app level module which depends on views, and components
var app = angular.module('botkit_notes', []).config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{%');
    $interpolateProvider.endSymbol('%}');
})

var converter = new showdown.Converter();

app.controller('notesController', ['$scope', '$http', '$sce', function($scope, $http, $sce) {

    $scope.notes = [];
  
    $scope.share = function(note_id) {
      
      microsoftTeams.shareDeepLink({ subEntityId: note_id, subEntityLabel: 'Note'})      

    }
    $scope.loadNotes = function(notes_url) {
      
      
      $http({
        method: 'get',
        url: notes_url,
      }).then(function(results) {
        $scope.notes = results.data;
        
        $scope.notes = $scope.notes.map(function(note) {
          note.html = $sce.trustAsHtml(converter.makeHtml(note.text));
          return note;
        });
        console.log('LOADED NOTES', results.data);
      })
      
    }
    
      if (typeof(notes_url)!='undefined') {
        $scope.loadNotes(notes_url);
      }
  
  
      microsoftTeams.initialize();
      microsoftTeams.getContext(function(context) {
        $scope.context = context;
        if (context.subEntityId) {
          $scope.highlighted_item = context.subEntityId;
        }
        $scope.$apply();

      });

  
  
}]);