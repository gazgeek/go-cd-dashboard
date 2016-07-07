goCdResponseBuilder = {};

var StageBuilder = function() {
    this.name = "Build";
    this.result = "Passed";
};

StageBuilder.prototype.withName = function(name) {
    this.name = name;
    return this;
};

StageBuilder.prototype.withResult = function(result) {
    this.result = result;
    return this;
};

StageBuilder.prototype.withCounter = function(counter) {
    this.counter = counter;
    return this;
};

StageBuilder.prototype.build = function() {
    var stage = this;
    return {
        name: stage.name,
        result: stage.result
    }
};

var PipelineHistoryBuilder = function() {
    this.pipelines = [new PipelineBuilder()]
};

PipelineHistoryBuilder.prototype.withPipeline = function(pipeline) {
    this.pipelines = [pipeline];
    return this;
};

PipelineHistoryBuilder.prototype.build = function() {
    var pipelines =[];
    this.pipelines.forEach(function(pipeline) {
        pipelines.push(pipeline.build())
    });
    return {
        pipelines: pipelines
    }
};

var PipelineBuilder = function() {
    this.name = "Dev";
    this.stages = [new StageBuilder()];
    this.counter = 1
};

PipelineBuilder.prototype.withName = function(name) {
    this.name = name;
    return this;
};

PipelineBuilder.prototype.withCounter = function(counter) {
    this.counter = counter;
    return this;
};

PipelineBuilder.prototype.withStage = function(stage) {
    this.stages = [stage];
    return this;
};

PipelineBuilder.prototype.addStage = function(stage) {
    this.stages.push(stage);
    return this;
};

PipelineBuilder.prototype.build = function() {
    var pipeline = this;
    var stages =[];
    this.stages.forEach(function(stage) {
        stages.push(stage.build())
    });
    return {
        name: pipeline.name,
        stages: stages,
        counter: pipeline.counter
    }
};

var PipelineSummaryBuilder = function() {
    this.name = "Dev";
    this.stages = [{name: "Build"}];    
};

PipelineSummaryBuilder.prototype.withName = function(name) {
    this.name = name;
};

PipelineSummaryBuilder.prototype.withStage = function(stage) {
    this.stages = [{name: stage}];
    return this;
};

PipelineSummaryBuilder.prototype.addStage = function(stage) {
    this.stages.push({name: stage});
    return this;
};

PipelineSummaryBuilder.prototype.build = function() {
    var pipelineSummary = this;
    return {
        name: pipelineSummary.name,
        stages: pipelineSummary.stages
    }
};

var PipelineGroupBuilder = function() {
    this.name = "Application";
    this.pipelines = [new PipelineSummaryBuilder()]
};

PipelineGroupBuilder.prototype.withName = function(name) {
    this.name = name;
    return this;
};

PipelineGroupBuilder.prototype.addPipeline = function(pipeline) {
    this.pipelines.push(pipeline);
    return this;
};

PipelineGroupBuilder.prototype.withPipeline = function(pipeline) {
    this.pipelines = [pipeline];
    return this;
};

PipelineGroupBuilder.prototype.build = function() {
    var group = this;
    var pipelines = [];
    this.pipelines.forEach(function(pipeline) {
        pipelines.push(pipeline.build())
    });
    return {
        name: group.name,
        pipelines: pipelines
    }
};

var PipelineGroupsBuilder = function() {
    this.groups = [new PipelineGroupBuilder()]    
};

PipelineGroupsBuilder.prototype.addGroup = function(group) {
    this.groups.push(group);
    return this;
};

PipelineGroupsBuilder.prototype.withGroup = function(group) {
    this.groups = [group];
    return this;
};


PipelineGroupsBuilder.prototype.build = function() {
    var groups = [];
    this.groups.forEach(function(group) {
        groups.push(group.build())
    });
    return groups
};

module.exports = {
    StageBuilder: StageBuilder,
    PipelineBuilder: PipelineBuilder,
    PipelineHistoryBuilder: PipelineHistoryBuilder,
    PipelineSummaryBuilder: PipelineSummaryBuilder,
    PipelineGroupBuilder: PipelineGroupBuilder,
    PipelineGroupsBuilder: PipelineGroupsBuilder
};
