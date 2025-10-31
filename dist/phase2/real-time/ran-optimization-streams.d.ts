/**
 * Real-time RAN Optimization Streams with Temporal Reasoning
 * Phase 2: Sub-second Optimization with Cognitive Intelligence
 */
import { AgentDB } from '../../agentdb/agentdb-core';
import { TemporalReasoningCore } from '../../temporal/temporal-core';
export interface RealTimeRANData {
    timestamp: Date;
    cellId: string;
    metrics: RealTimeMetrics;
    configuration: CellConfiguration;
    environmental: EnvironmentalConditions;
    userActivity: UserActivityData;
    alerts: AlertData[];
    performance: RealTimePerformance;
}
export interface RealTimeMetrics {
    throughput: MetricValue;
    latency: MetricValue;
    packetLoss: MetricValue;
    jitter: MetricValue;
    availability: MetricValue;
    spectralEfficiency: MetricValue;
    energyEfficiency: MetricValue;
    qualityOfService: MetricValue;
}
export interface MetricValue {
    current: number;
    trend: TrendDirection;
    velocity: number;
    acceleration: number;
    volatility: number;
    prediction: MetricPrediction;
    anomaly: AnomalyInfo;
}
export declare enum TrendDirection {
    IMPROVING = "improving",
    DEGRADING = "degrading",
    STABLE = "stable",
    VOLATILE = "volatile"
}
export interface MetricPrediction {
    shortTerm: PredictionValue;
    mediumTerm: PredictionValue;
    longTerm: PredictionValue;
    confidence: number;
    model: string;
}
export interface PredictionValue {
    value: number;
    probability: number;
    range: [number, number];
    timestamp: Date;
}
export interface AnomalyInfo {
    detected: boolean;
    severity: AnomalySeverity;
    type: AnomalyType;
    description: string;
    confidence: number;
    firstDetected: Date;
    duration: number;
}
export declare enum AnomalySeverity {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    CRITICAL = "critical"
}
export declare enum AnomalyType {
    SPIKE = "spike",
    DROP = "drop",
    DRIFT = "drift",
    OSCILLATION = "oscillation",
    PATTERN_BREAK = "pattern_break",
    THRESHOLD_BREACH = "threshold_breach"
}
export interface CellConfiguration {
    power: ConfigurationParameter;
    antennaTilt: ConfigurationParameter;
    azimuth: ConfigurationParameter;
    bandwidth: ConfigurationParameter;
    frequency: ConfigurationParameter;
    modulation: ConfigurationParameter;
    handoverParameters: HandoverConfiguration;
    scheduling: SchedulingConfiguration;
}
export interface ConfigurationParameter {
    current: number;
    target: number;
    min: number;
    max: number;
    step: number;
    status: ParameterStatus;
    lastChanged: Date;
    changeReason?: string;
}
export declare enum ParameterStatus {
    STABLE = "stable",
    ADJUSTING = "adjusting",
    LOCKED = "locked",
    ERROR = "error"
}
export interface HandoverConfiguration {
    hysteresis: ConfigurationParameter;
    triggerOffset: ConfigurationParameter;
    timeToTrigger: ConfigurationParameter;
    a3Offset: ConfigurationParameter;
}
export interface SchedulingConfiguration {
    schedulerType: SchedulerType;
    weights: SchedulingWeights;
    priorities: SchedulingPriorities;
    fairnessFactor: ConfigurationParameter;
}
export declare enum SchedulerType {
    PROPORTIONAL_FAIR = "proportional_fair",
    MAX_CQI = "max_cqi",
    ROUND_ROBIN = "round_robin",
    WEIGHTED_FAIR = "weighted_fair",
    ML_ENHANCED = "ml_enhanced"
}
export interface SchedulingWeights {
    throughput: number;
    latency: number;
    fairness: number;
    energy: number;
    reliability: number;
}
export interface SchedulingPriorities {
    emergency: number;
    voice: number;
    video: number;
    data: number;
    background: number;
}
export interface EnvironmentalConditions {
    interference: InterferenceData;
    noise: NoiseData;
    weather: WeatherData;
    topology: TopologyData;
    neighboringCells: NeighboringCell[];
}
export interface InterferenceData {
    intraCell: number;
    interCell: number;
    external: number;
    thermal: number;
    sources: InterferenceSource[];
    trends: InterferenceTrend[];
}
export interface InterferenceSource {
    id: string;
    type: InterferenceType;
    strength: number;
    frequency: number;
    direction: number;
    distance: number;
}
export declare enum InterferenceType {
    CO_CHANNEL = "co_channel",
    ADJACENT_CHANNEL = "adjacent_channel",
    INTERMODULATION = "intermodulation",
    EXTERNAL = "external"
}
export interface InterferenceTrend {
    time: Date;
    level: number;
    prediction: PredictionValue;
    confidence: number;
}
export interface NoiseData {
    floor: number;
    figure: number;
    temperature: number;
    sources: NoiseSource[];
}
export interface NoiseSource {
    type: NoiseType;
    level: number;
    bandwidth: number;
    characteristics: NoiseCharacteristics;
}
export declare enum NoiseType {
    THERMAL = "thermal",
    ATMOSPHERIC = "atmospheric",
    COSMIC = "cosmic",
    MAN_MADE = "man_made"
}
export interface NoiseCharacteristics {
    spectral: boolean;
    gaussian: boolean;
    stationary: boolean;
    periodic: boolean;
}
export interface WeatherData {
    temperature: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
    windDirection: number;
    precipitation: number;
    visibility: number;
    impact: WeatherImpact;
}
export interface WeatherImpact {
    signalAttenuation: number;
    noiseIncrease: number;
    reliability: number;
    recommendedAdjustments: Adjustment[];
}
export interface Adjustment {
    parameter: string;
    currentValue: number;
    recommendedValue: number;
    reason: string;
    urgency: number;
    confidence: number;
}
export interface TopologyData {
    terrain: TerrainType;
    urbanDensity: UrbanDensity;
    buildingHeight: BuildingHeightDistribution;
    foliage: FoliageData;
    propagation: PropagationCharacteristics;
}
export declare enum TerrainType {
    PLAIN = "plain",
    HILLY = "hilly",
    MOUNTAINOUS = "mountainous",
    URBAN = "urban",
    SUBURBAN = "suburban",
    RURAL = "rural"
}
export declare enum UrbanDensity {
    DENSE_URBAN = "dense_urban",
    URBAN = "urban",
    SUBURBAN = "suburban",
    RURAL = "rural",
    OPEN_AREA = "open_area"
}
export interface BuildingHeightDistribution {
    average: number;
    minimum: number;
    maximum: number;
    distribution: HeightDistribution;
    shadowZones: ShadowZone[];
}
export interface HeightDistribution {
    low: number;
    medium: number;
    high: number;
    veryHigh: number;
}
export interface ShadowZone {
    id: string;
    area: GeographicArea;
    attenuation: number;
    frequency: number;
    timeOfDay: TimeOfDay[];
    seasonal: SeasonalVariation;
}
export interface GeographicArea {
    type: AreaType;
    coordinates: Coordinate[];
    radius?: number;
}
export declare enum AreaType {
    CIRCLE = "circle",
    POLYGON = "polygon",
    RECTANGLE = "rectangle"
}
export interface Coordinate {
    latitude: number;
    longitude: number;
    altitude?: number;
}
export interface TimeOfDay {
    start: string;
    end: string;
    impact: number;
}
export interface SeasonalVariation {
    spring: number;
    summer: number;
    autumn: number;
    winter: number;
}
export interface FoliageData {
    density: FoliageDensity;
    type: VegetationType;
    seasonalLoss: SeasonalLoss;
    moisture: number;
}
export declare enum FoliageDensity {
    NONE = "none",
    LIGHT = "light",
    MODERATE = "moderate",
    DENSE = "dense",
    VERY_DENSE = "very_dense"
}
export declare enum VegetationType {
    DECIDUOUS = "deciduous",
    EVERGREEN = "evergreen",
    MIXED = "mixed",
    GRASSLAND = "grassland",
    SHRUBLAND = "shrubland"
}
export interface SeasonalLoss {
    summer: number;
    autumn: number;
    winter: number;
    spring: number;
}
export interface PropagationCharacteristics {
    pathLoss: PathLossModel;
    multipath: MultipathCharacteristics;
    diffraction: DiffractionCharacteristics;
    scattering: ScatteringCharacteristics;
}
export interface PathLossModel {
    model: PropagationModel;
    parameters: ModelParameters;
    accuracy: number;
    validity: ValidityRange;
}
export declare enum PropagationModel {
    FREE_SPACE = "free_space",
    TWO_RAY = "two_ray",
    OKUMURA_HATA = "okumura_hata",
    COST231 = "cost231",
    WINNER_II = "winner_ii",
    THREE_GPP = "3gpp",
    ML_ENHANCED = "ml_enhanced"
}
export interface ModelParameters {
    [key: string]: number;
}
export interface ValidityRange {
    frequency: [number, number];
    distance: [number, number];
    environment: EnvironmentType[];
}
export declare enum EnvironmentType {
    INDOOR = "indoor",
    OUTDOOR = "outdoor",
    MIXED = "mixed"
}
export interface MultipathCharacteristics {
    rmsDelaySpread: number;
    coherenceBandwidth: number;
    coherenceTime: number;
    dopplerSpread: number;
    paths: MultipathPath[];
}
export interface MultipathPath {
    delay: number;
    power: number;
    phase: number;
    doppler: number;
    aoa: AngleOfArrival;
    aod: AngleOfDeparture;
}
export interface AngleOfArrival {
    azimuth: number;
    elevation: number;
    spread: number;
}
export interface AngleOfDeparture {
    azimuth: number;
    elevation: number;
    spread: number;
}
export interface DiffractionCharacteristics {
    knifeEdgeLoss: number;
    roundedEdgeLoss: number;
    multipleEdges: MultipleEdgeEffect[];
}
export interface MultipleEdgeEffect {
    path: number;
    loss: number;
    dominant: boolean;
}
export interface ScatteringCharacteristics {
    scatteringCrossSection: number;
    angularSpread: number;
    delaySpread: number;
    scatterers: Scatterer[];
}
export interface Scatterer {
    position: Coordinate;
    crossSection: number;
    reflection: number;
    type: ScattererType;
}
export declare enum ScattererType {
    BUILDING = "building",
    VEHICLE = "vehicle",
    VEGETATION = "vegetation",
    GROUND = "ground",
    WATER = "water"
}
export interface NeighboringCell {
    id: string;
    type: CellType;
    location: Coordinate;
    distance: number;
    power: number;
    interference: InterferenceImpact;
    handoverRelations: HandoverRelation[];
    coordination: CoordinationInfo;
}
export declare enum CellType {
    MACRO = "macro",
    MICRO = "micro",
    PICO = "pico",
    FEMTO = "femto",
    RELAY = "relay"
}
export interface InterferenceImpact {
    level: number;
    frequency: number;
    bandwidth: number;
    mitigation: MitigationTechnique[];
}
export interface MitigationTechnique {
    type: TechniqueType;
    effectiveness: number;
    cost: number;
    complexity: number;
    currentStatus: TechniqueStatus;
}
export declare enum TechniqueType {
    POWER_CONTROL = "power_control",
    SCHEDULING = "scheduling",
    COORDINATION = "coordination",
    ANTENNA = "antenna",
    FREQUENCY = "frequency"
}
export declare enum TechniqueStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    PENDING = "pending",
    FAILED = "failed"
}
export interface HandoverRelation {
    targetCell: string;
    relationType: HandoverRelationType;
    hysteresis: number;
    offset: number;
    statistics: HandoverStatistics;
}
export declare enum HandoverRelationType {
    INTRA_FREQUENCY = "intra_frequency",
    INTER_FREQUENCY = "inter_frequency",
    INTER_RAT = "inter_rat"
}
export interface HandoverStatistics {
    attempts: number;
    successes: number;
    failures: number;
    averageTime: number;
    pingPong: number;
    tooEarly: number;
    tooLate: number;
}
export interface CoordinationInfo {
    coordinated: boolean;
    coordinationMethod: CoordinationMethod;
    sharingLevel: SharingLevel;
    latency: number;
    reliability: number;
}
export declare enum CoordinationMethod {
    NONE = "none",
    STATIC = "static",
    DYNAMIC = "dynamic",
    COORDINATED_MP = "coordinated_mp",
    JOINED_TRANSMISSION = "joined_transmission",
    DYNAMIC_POINT_BLANKING = "dynamic_point_blanking"
}
export declare enum SharingLevel {
    NONE = "none",
    BASIC = "basic",
    ENHANCED = "enhanced",
    FULL = "full"
}
export interface UserActivityData {
    userCount: UserCountData;
    distribution: UserDistribution;
    mobility: MobilityData;
    services: ServiceUsageData;
    quality: QualityExperienceData;
}
export interface UserCountData {
    total: number;
    active: number;
    idle: number;
    new: number;
    leaving: number;
    prediction: UserCountPrediction;
}
export interface UserCountPrediction {
    nextMinute: PredictionValue;
    next5Minutes: PredictionValue;
    next15Minutes: PredictionValue;
    nextHour: PredictionValue;
    confidence: number;
}
export interface UserDistribution {
    spatial: SpatialDistribution;
    temporal: TemporalDistribution;
    service: ServiceDistribution;
    qos: QoSDistribution;
}
export interface SpatialDistribution {
    heatmap: HeatmapData;
    hotspots: Hotspot[];
    coverage: CoverageDistribution;
    capacity: CapacityDistribution;
}
export interface HeatmapData {
    grid: HeatmapGrid;
    resolution: number;
    timestamp: Date;
    interpolation: InterpolationMethod;
}
export interface HeatmapGrid {
    width: number;
    height: number;
    cellSize: number;
    origin: Coordinate;
    values: number[][];
}
export declare enum InterpolationMethod {
    NEAREST = "nearest",
    LINEAR = "linear",
    CUBIC = "cubic",
    GAUSSIAN = "gaussian",
    KRIGING = "kriging"
}
export interface Hotspot {
    id: string;
    center: Coordinate;
    radius: number;
    intensity: number;
    type: HotspotType;
    duration: number;
    trend: TrendDirection;
}
export declare enum HotspotType {
    RESIDENTIAL = "residential",
    COMMERCIAL = "commercial",
    TRANSPORT = "transport",
    EVENT = "event",
    TEMPORARY = "temporary"
}
export interface CoverageDistribution {
    excellent: number;
    good: number;
    fair: number;
    poor: number;
    average: number;
    prediction: CoveragePrediction;
}
export interface CoveragePrediction {
    nextUpdate: Date;
    expectedChange: number;
    confidence: number;
    factors: PredictionFactor[];
}
export interface PredictionFactor {
    factor: string;
    impact: number;
    certainty: number;
}
export interface CapacityDistribution {
    available: number;
    utilized: number;
    utilization: number;
    bottleneck: BottleneckInfo;
    prediction: CapacityPrediction;
}
export interface BottleneckInfo {
    exists: boolean;
    type: BottleneckType;
    severity: number;
    location: Coordinate;
    timeWindow: TimeWindow;
}
export declare enum BottleneckType {
    INTERFERENCE = "interference",
    CAPACITY = "capacity",
    COVERAGE = "coverage",
    HARDWARE = "hardware",
    BACKHAUL = "backhaul"
}
export interface TimeWindow {
    start: Date;
    end: Date;
    duration: number;
}
export interface CapacityPrediction {
    timeToFull: number;
    expansionNeeded: boolean;
    recommendedActions: RecommendedAction[];
}
export interface RecommendedAction {
    action: ActionType;
    priority: number;
    impact: number;
    cost: number;
    timeline: number;
    confidence: number;
}
export declare enum ActionType {
    ADD_CARRIER = "add_carrier",
    ADJUST_POWER = "adjust_power",
    OPTIMIZE_ANTENNA = "optimize_antenna",
    LOAD_BALANCE = "load_balance",
    COORDINATE = "coordinate",
    UPGRADE = "upgrade"
}
export interface TemporalDistribution {
    hourly: HourlyPattern;
    daily: DailyPattern;
    weekly: WeeklyPattern;
    seasonal: SeasonalPattern;
}
export interface HourlyPattern {
    current: number;
    pattern: number[];
    peak: PeakInfo;
    trough: TroughInfo;
    prediction: HourlyPrediction;
}
export interface PeakInfo {
    hour: number;
    value: number;
    duration: number;
    regularity: number;
}
export interface TroughInfo {
    hour: number;
    value: number;
    duration: number;
    regularity: number;
}
export interface HourlyPrediction {
    nextHour: PredictionValue;
    peakToday: PredictionValue;
    peakTomorrow: PredictionValue;
}
export interface DailyPattern {
    weekdays: number[];
    weekends: number[];
    pattern: DailyPatternData[];
    average: number;
    variance: number;
}
export interface DailyPatternData {
    hour: number;
    average: number;
    variance: number;
    min: number;
    max: number;
}
export interface WeeklyPattern {
    days: number[];
    pattern: WeeklyPatternData[];
    average: number;
    variance: number;
}
export interface WeeklyPatternData {
    day: number;
    average: number;
    variance: number;
    min: number;
    max: number;
}
export interface SeasonalPattern {
    spring: SeasonData;
    summer: SeasonData;
    autumn: SeasonData;
    winter: SeasonData;
    trend: SeasonalTrend;
}
export interface SeasonData {
    average: number;
    peak: number;
    trough: number;
    variance: number;
}
export interface SeasonalTrend {
    direction: TrendDirection;
    rate: number;
    confidence: number;
    factors: TrendFactor[];
}
export interface TrendFactor {
    factor: string;
    weight: number;
    correlation: number;
}
export interface ServiceDistribution {
    voice: ServiceUsage;
    video: ServiceUsage;
    data: ServiceUsage;
    messaging: ServiceUsage;
    iot: ServiceUsage;
    emergency: ServiceUsage;
}
export interface ServiceUsage {
    users: number;
    traffic: number;
    demand: number;
    qos: ServiceQoS;
    prediction: ServicePrediction;
}
export interface ServiceQoS {
    latency: number;
    jitter: number;
    packetLoss: number;
    reliability: number;
    availability: number;
}
export interface ServicePrediction {
    growthRate: number;
    peakDemand: PredictionValue;
    qosRequirement: QoSPrediction;
}
export interface QoSPrediction {
    latency: PredictionValue;
    throughput: PredictionValue;
    reliability: PredictionValue;
}
export interface QoSDistribution {
    excellent: number;
    good: number;
    fair: number;
    poor: number;
    average: number;
    complaints: ComplaintData;
}
export interface ComplaintData {
    total: number;
    byCategory: CategoryComplaint[];
    trend: ComplaintTrend;
    resolution: ResolutionData;
}
export interface CategoryComplaint {
    category: ComplaintCategory;
    count: number;
    severity: number;
    trend: TrendDirection;
}
export declare enum ComplaintCategory {
    COVERAGE = "coverage",
    THROUGHPUT = "throughput",
    LATENCY = "latency",
    DROPPED_CALLS = "dropped_calls",
    HANDOVER = "handover",
    OTHER = "other"
}
export interface ComplaintTrend {
    direction: TrendDirection;
    rate: number;
    confidence: number;
}
export interface ResolutionData {
    averageTime: number;
    successRate: number;
    backlog: number;
}
export interface MobilityData {
    handovers: HandoverData;
    speed: SpeedData;
    direction: DirectionData;
    patterns: MobilityPattern[];
    prediction: MobilityPrediction;
}
export interface HandoverData {
    attempts: number;
    successes: number;
    failures: number;
    successRate: number;
    averageTime: number;
    causes: HandoverCause[];
}
export interface HandoverCause {
    cause: HandoverCauseType;
    count: number;
    percentage: number;
    trend: TrendDirection;
}
export declare enum HandoverCauseType {
    COVERAGE = "coverage",
    QUALITY = "quality",
    INTERFERENCE = "interference",
    LOAD = "load",
    MOBILITY = "mobility",
    OPTIMIZATION = "optimization"
}
export interface SpeedData {
    average: number;
    distribution: SpeedDistribution;
    trends: SpeedTrend[];
    prediction: SpeedPrediction;
}
export interface SpeedDistribution {
    stationary: number;
    walking: number;
    vehicular: number;
    highSpeed: number;
}
export interface SpeedTrend {
    time: Date;
    speed: number;
    change: number;
    confidence: number;
}
export interface SpeedPrediction {
    nextMinute: PredictionValue;
    next5Minutes: PredictionValue;
    peakToday: PredictionValue;
}
export interface DirectionData {
    flows: FlowData[];
    convergence: ConvergencePoint[];
    divergence: DivergencePoint[];
    patterns: DirectionPattern[];
}
export interface FlowData {
    from: Coordinate;
    to: Coordinate;
    volume: number;
    speed: number;
    type: FlowType;
}
export declare enum FlowType {
    COMMUTING = "commuting",
    COMMERCIAL = "commercial",
    RECREATIONAL = "recreational",
    EMERGENCY = "emergency"
}
export interface ConvergencePoint {
    location: Coordinate;
    volume: number;
    types: FlowType[];
    timing: TimingPattern[];
}
export interface TimingPattern {
    start: string;
    end: string;
    intensity: number;
    regularity: number;
}
export interface DivergencePoint {
    location: Coordinate;
    volume: number;
    destinations: Destination[];
    timing: TimingPattern[];
}
export interface Destination {
    location: Coordinate;
    volume: number;
    percentage: number;
}
export interface DirectionPattern {
    pattern: string;
    frequency: number;
    strength: number;
    seasonality: number;
}
export interface MobilityPattern {
    id: string;
    type: MobilityPatternType;
    description: string;
    locations: Coordinate[];
    timing: TimingPattern[];
    users: number;
    confidence: number;
}
export declare enum MobilityPatternType {
    COMMUTING = "commuting",
    SHOPPING = "shopping",
    WORK = "work",
    SCHOOL = "school",
    EVENT = "event",
    TOURISM = "tourism"
}
export interface MobilityPrediction {
    patterns: PredictedPattern[];
    congestion: CongestionPrediction;
    hotspots: HotspotPrediction[];
}
export interface PredictedPattern {
    pattern: MobilityPatternType;
    strength: PredictionValue;
    timing: TimeWindow;
    confidence: number;
}
export interface CongestionPrediction {
    areas: CongestionArea[];
    times: CongestionTime[];
    severity: SeverityPrediction;
}
export interface CongestionArea {
    area: GeographicArea;
    severity: number;
    duration: number;
    impact: number;
}
export interface CongestionTime {
    time: string;
    severity: number;
    duration: number;
    affected: number;
}
export interface SeverityPrediction {
    level: AnomalySeverity;
    probability: number;
    impact: number;
    mitigation: MitigationStrategy[];
}
export interface MitigationStrategy {
    strategy: string;
    effectiveness: number;
    cost: number;
    timeline: number;
}
export interface HotspotPrediction {
    location: Coordinate;
    intensity: PredictionValue;
    type: HotspotType;
    timing: TimeWindow;
    confidence: number;
}
export interface ServiceUsageData {
    services: ServiceUsageDetails[];
    trends: ServiceTrend[];
    quality: ServiceQualityData;
    prediction: ServiceUsagePrediction;
}
export interface ServiceUsageDetails {
    service: string;
    users: number;
    traffic: number;
    revenue: number;
    satisfaction: number;
    churn: number;
}
export interface ServiceTrend {
    service: string;
    growth: number;
    seasonality: number;
    prediction: TrendPrediction;
}
export interface TrendPrediction {
    shortTerm: PredictionValue;
    mediumTerm: PredictionValue;
    longTerm: PredictionValue;
    confidence: number;
}
export interface ServiceQualityData {
    overall: number;
    byService: ServiceQuality[];
    byLocation: LocationQuality[];
    trends: QualityTrend[];
}
export interface ServiceQuality {
    service: string;
    availability: number;
    latency: number;
    throughput: number;
    reliability: number;
    satisfaction: number;
}
export interface LocationQuality {
    location: Coordinate;
    quality: number;
    issues: QualityIssue[];
    improvement: ImprovementOpportunity[];
}
export interface QualityIssue {
    type: QualityIssueType;
    severity: number;
    frequency: number;
    impact: number;
}
export declare enum QualityIssueType {
    POOR_COVERAGE = "poor_coverage",
    HIGH_LATENCY = "high_latency",
    LOW_THROUGHPUT = "low_throughput",
    DROPPED_CONNECTIONS = "dropped_connections",
    INTERFERENCE = "interference"
}
export interface ImprovementOpportunity {
    type: ImprovementType;
    potential: number;
    cost: number;
    timeline: number;
    confidence: number;
}
export declare enum ImprovementType {
    ANTENNA_ADJUSTMENT = "antenna_adjustment",
    POWER_OPTIMIZATION = "power_optimization",
    FREQUENCY_PLANNING = "frequency_planning",
    CAPACITY_EXPANSION = "capacity_expansion",
    INTERFERENCE_MITIGATION = "interference_mitigation"
}
export interface QualityTrend {
    metric: string;
    trend: TrendDirection;
    rate: number;
    confidence: number;
    forecast: QualityForecast;
}
export interface QualityForecast {
    future: number;
    range: [number, number];
    probability: number;
    timeframe: string;
}
export interface ServiceUsagePrediction {
    growth: GrowthPrediction;
    newServices: NewServicePrediction[];
    obsolescence: ServiceObsolescence[];
    capacity: CapacityRequirement;
}
export interface GrowthPrediction {
    rate: number;
    drivers: GrowthDriver[];
    scenarios: GrowthScenario[];
}
export interface GrowthDriver {
    driver: string;
    impact: number;
    probability: number;
    timeline: number;
}
export interface GrowthScenario {
    scenario: string;
    probability: number;
    growth: number;
    assumptions: string[];
}
export interface NewServicePrediction {
    service: string;
    launch: Date;
    adoption: AdoptionCurve;
    impact: number;
}
export interface AdoptionCurve {
    early: number;
    growth: number;
    mature: number;
    saturation: number;
    timeline: number[];
}
export interface ServiceObsolescence {
    service: string;
    decline: number;
    timeline: Date;
    replacement: string;
}
export interface CapacityRequirement {
    current: number;
    required: number;
    gap: number;
    timeline: Date;
    solutions: CapacitySolution[];
}
export interface CapacitySolution {
    type: SolutionType;
    capacity: number;
    cost: number;
    timeline: number;
    confidence: number;
}
export declare enum SolutionType {
    SPECTRUM = "spectrum",
    INFRASTRUCTURE = "infrastructure",
    TECHNOLOGY = "technology",
    OPTIMIZATION = "optimization"
}
export interface QualityExperienceData {
    overall: QualityScore;
    byDimension: DimensionScore[];
    byUserType: UserTypeScore[];
    trends: QualityTrendData[];
    predictions: QualityPredictionData;
}
export interface QualityScore {
    score: number;
    level: QualityLevel;
    trend: TrendDirection;
    confidence: number;
}
export declare enum QualityLevel {
    EXCELLENT = "excellent",
    GOOD = "good",
    FAIR = "fair",
    POOR = "poor"
}
export interface DimensionScore {
    dimension: QualityDimension;
    score: number;
    weight: number;
    trend: TrendDirection;
}
export declare enum QualityDimension {
    COVERAGE = "coverage",
    SPEED = "speed",
    RELIABILITY = "reliability",
    LATENCY = "latency",
    STABILITY = "stability"
}
export interface UserTypeScore {
    userType: UserType;
    score: number;
    requirements: UserRequirement[];
    satisfaction: SatisfactionData;
}
export declare enum UserType {
    RESIDENTIAL = "residential",
    BUSINESS = "business",
    ENTERPRISE = "enterprise",
    GOVERNMENT = "government",
    EMERGENCY = "emergency"
}
export interface UserRequirement {
    dimension: QualityDimension;
    requirement: number;
    importance: number;
    met: boolean;
}
export interface SatisfactionData {
    overall: number;
    byDimension: DimensionSatisfaction[];
    complaints: ComplaintSummary;
}
export interface DimensionSatisfaction {
    dimension: QualityDimension;
    satisfaction: number;
    complaints: number;
}
export interface ComplaintSummary {
    total: number;
    byCategory: CategoryComplaintSummary[];
    trend: ComplaintTrendData;
}
export interface CategoryComplaintSummary {
    category: ComplaintCategory;
    count: number;
    severity: number;
    resolution: ResolutionSummary;
}
export interface ResolutionSummary {
    resolved: number;
    pending: number;
    averageTime: number;
    successRate: number;
}
export interface ComplaintTrendData {
    direction: TrendDirection;
    rate: number;
    forecast: ComplaintForecast;
}
export interface ComplaintForecast {
    expected: PredictionValue;
    categories: CategoryForecast[];
}
export interface CategoryForecast {
    category: ComplaintCategory;
    expected: PredictionValue;
    confidence: number;
}
export interface QualityTrendData {
    timeframe: TimeFrame;
    score: number;
    change: number;
    drivers: TrendDriver[];
    forecast: QualityForecastData;
}
export declare enum TimeFrame {
    HOURLY = "hourly",
    DAILY = "daily",
    WEEKLY = "weekly",
    MONTHLY = "monthly"
}
export interface TrendDriver {
    factor: string;
    impact: number;
    correlation: number;
    confidence: number;
}
export interface QualityForecastData {
    score: PredictionValue;
    dimensions: DimensionForecast[];
    confidence: number;
}
export interface DimensionForecast {
    dimension: QualityDimension;
    score: PredictionValue;
    confidence: number;
}
export interface QualityPredictionData {
    timeframe: TimeFrame;
    overall: QualityScorePrediction;
    dimensions: DimensionScorePrediction[];
    risks: QualityRisk[];
    opportunities: QualityOpportunity[];
}
export interface QualityScorePrediction {
    score: PredictionValue;
    level: PredictedLevel;
    confidence: number;
}
export interface PredictedLevel {
    current: QualityLevel;
    predicted: QualityLevel;
    probability: number;
}
export interface DimensionScorePrediction {
    dimension: QualityDimension;
    score: PredictionValue;
    confidence: number;
}
export interface QualityRisk {
    risk: string;
    probability: number;
    impact: number;
    timeframe: Date;
    mitigation: RiskMitigation[];
}
export interface RiskMitigation {
    action: string;
    effectiveness: number;
    cost: number;
    timeline: number;
}
export interface QualityOpportunity {
    opportunity: string;
    potential: number;
    confidence: number;
    investment: number;
    timeline: number;
}
export interface AlertData {
    id: string;
    type: AlertType;
    severity: AlertSeverity;
    title: string;
    description: string;
    source: string;
    timestamp: Date;
    acknowledged: boolean;
    resolved: boolean;
    resolution?: AlertResolution;
    relatedData: any;
}
export declare enum AlertType {
    PERFORMANCE = "performance",
    CONFIGURATION = "configuration",
    SECURITY = "security",
    CAPACITY = "capacity",
    QUALITY = "quality",
    MAINTENANCE = "maintenance",
    EMERGENCY = "emergency"
}
export declare enum AlertSeverity {
    INFO = "info",
    WARNING = "warning",
    ERROR = "error",
    CRITICAL = "critical"
}
export interface AlertResolution {
    action: string;
    agent: string;
    timestamp: Date;
    duration: number;
    outcome: string;
    notes?: string;
}
export interface RealTimePerformance {
    overall: PerformanceScore;
    kpis: PerformanceKPI[];
    benchmarks: BenchmarkData[];
    trends: PerformanceTrend[];
    predictions: PerformancePrediction;
}
export interface PerformanceScore {
    score: number;
    grade: PerformanceGrade;
    change: number;
    trend: TrendDirection;
}
export declare enum PerformanceGrade {
    EXCELLENT = "excellent",
    GOOD = "good",
    ACCEPTABLE = "acceptable",
    POOR = "poor",
    CRITICAL = "critical"
}
export interface PerformanceKPI {
    name: string;
    current: number;
    target: number;
    threshold: number;
    status: KPIStatus;
    trend: TrendDirection;
    prediction: PredictionValue;
}
export declare enum KPIStatus {
    HEALTHY = "healthy",
    WARNING = "warning",
    CRITICAL = "critical"
}
export interface BenchmarkData {
    metric: string;
    current: number;
    benchmark: number;
    percentile: number;
    comparison: ComparisonData;
}
export interface ComparisonData {
    network: number;
    region: number;
    global: number;
    industry: number;
}
export interface PerformanceTrend {
    metric: string;
    period: TimeFrame;
    trend: TrendData;
    forecast: TrendForecast;
}
export interface TrendData {
    values: number[];
    timestamps: Date[];
    pattern: TrendPattern;
    seasonality: SeasonalityData;
    anomalies: AnomalyData[];
}
export interface TrendPattern {
    type: PatternType;
    strength: number;
    duration: number;
    confidence: number;
}
export declare enum PatternType {
    LINEAR = "linear",
    EXPONENTIAL = "exponential",
    LOGARITHMIC = "logarithmic",
    CYCLIC = "cyclic",
    RANDOM = "random"
}
export interface SeasonalityData {
    detected: boolean;
    period: number;
    strength: number;
    phase: number;
}
export interface AnomalyData {
    timestamp: Date;
    value: number;
    expected: number;
    deviation: number;
    type: AnomalyType;
    severity: AnomalySeverity;
}
export interface TrendForecast {
    method: ForecastMethod;
    horizon: Date;
    values: ForecastValue[];
    confidence: number;
    accuracy: number;
}
export declare enum ForecastMethod {
    LINEAR = "linear",
    EXPONENTIAL_SMOOTHING = "exponential_smoothing",
    ARIMA = "arima",
    NEURAL_NETWORK = "neural_network",
    ENSEMBLE = "ensemble"
}
export interface ForecastValue {
    timestamp: Date;
    value: number;
    lower: number;
    upper: number;
    probability: number;
}
export interface PerformancePrediction {
    timeframe: TimeFrame;
    overall: OverallPrediction;
    kpis: KPIPrediction[];
    risks: PerformanceRisk[];
    opportunities: PerformanceOpportunity[];
}
export interface OverallPrediction {
    score: PredictionValue;
    grade: PredictedGrade;
    confidence: number;
}
export interface PredictedGrade {
    current: PerformanceGrade;
    predicted: PerformanceGrade;
    probability: number;
}
export interface KPIPrediction {
    kpi: string;
    current: number;
    predicted: PredictionValue;
    confidence: number;
    target: number;
    likelihood: number;
}
export interface PerformanceRisk {
    risk: string;
    probability: number;
    impact: number;
    timeframe: Date;
    kpis: string[];
    mitigation: RiskMitigation[];
}
export interface PerformanceOpportunity {
    opportunity: string;
    potential: number;
    confidence: number;
    investment: number;
    timeframe: Date;
    kpis: string[];
}
export declare class RealTimeRANOptimizationStreams {
    private agentDB;
    private temporalCore;
    private anomalyDetector;
    private optimizationEngine;
    private predictor;
    private controller;
    constructor(agentDB: AgentDB, temporalCore: TemporalReasoningCore);
    createRealTimeOptimizationStream(): Promise<any>;
    private createRealTimeDataIngestionProcessor;
    private createAnomalyDetectionProcessor;
    private createPredictionProcessor;
    private createOptimizationTriggerProcessor;
    private createRealTimeOptimizationProcessor;
    private createPolicyAdaptationProcessor;
    private createFeedbackLoopProcessor;
    private processRealTimeMetrics;
    private processMetricValue;
    private determineTrend;
    private generateMetricPrediction;
    private detectMetricAnomaly;
    private processCellConfiguration;
    private processConfigurationParameter;
    private determineParameterStatus;
    private processEnvironmentalConditions;
    private processInterferenceData;
    private processNoiseData;
    private processWeatherData;
    private processTopologyData;
    private processNeighboringCell;
    private processUserActivityData;
    private processUserCountData;
    private processUserDistribution;
    private processSpatialDistribution;
    private processTemporalDistribution;
    private processServiceDistribution;
    private processServiceUsage;
    private processQoSDistribution;
    private processMobilityData;
    private processServiceUsageData;
    private processQualityExperienceData;
    private processAlerts;
    private processRealTimePerformance;
    private storeRealTimeData;
    private storeAnomalyResults;
    private storePredictionResults;
    private storeOptimizationResults;
    private storePolicyAdaptations;
    private storeFeedbackLoopResults;
    private calculatePredictionConfidence;
    private evaluatePerformanceTriggers;
    private validateOptimizationActions;
    private prioritizeOptimizationActions;
    private executeOptimizationActions;
    private analyzeOptimizationResults;
    private adaptPoliciesFromSuccess;
    private learnFromFailures;
    private updateTemporalPatterns;
    private calculateLearningRate;
    private calculatePolicyImprovement;
    private collectPerformanceFeedback;
    private collectSystemFeedback;
    private collectUserFeedback;
    private analyzeFeedbackPatterns;
    private generateImprovementRecommendations;
    private updateAgentDBWithLearning;
    private applyLearning;
}
export interface AnomalyDetectionResult {
    totalAnomalies: number;
    criticalAnomalies: number;
    anomalies: AnomalyInfo[];
    requiresOptimization: boolean;
    timestamp: Date;
}
export interface PredictionResult {
    predictions: CellPrediction[];
    averageConfidence: number;
    criticalPredictions: CellPrediction[];
    timestamp: Date;
}
export interface CellPrediction {
    cellId: string;
    timestamp: Date;
    metricPredictions: any;
    capacityPrediction: any;
    qualityPrediction: any;
    interferencePrediction: any;
    confidence: number;
    horizon: string;
}
export interface OptimizationTrigger {
    type: TriggerType;
    priority: TriggerPriority;
    description: string;
    confidence: number;
    estimatedBenefit: number;
    cells: string[];
}
export declare enum TriggerType {
    ANOMALY = "anomaly",
    PREDICTION = "prediction",
    PERFORMANCE = "performance",
    CAPACITY = "capacity",
    QUALITY = "quality"
}
export declare enum TriggerPriority {
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3,
    CRITICAL = 4
}
export interface OptimizationTriggerResult {
    triggers: OptimizationTrigger[];
    shouldOptimize: boolean;
    priority: number;
    estimatedOverallBenefit: number;
    timestamp: Date;
}
export interface OptimizationAction {
    id: string;
    type: OptimizationType;
    target: string;
    parameters: any;
    priority: number;
    estimatedBenefit: number;
    risk: number;
    executionTime: number;
}
export declare enum OptimizationType {
    POWER_ADJUSTMENT = "power_adjustment",
    ANTENNA_OPTIMIZATION = "antenna_optimization",
    BANDWIDTH_ALLOCATION = "bandwidth_allocation",
    LOAD_BALANCING = "load_balancing",
    INTERFERENCE_MITIGATION = "interference_mitigation"
}
export interface OptimizationResult {
    optimizations: ExecutionResult[];
    success: boolean;
    totalBenefit?: number;
    executionTime: number;
    timestamp: Date;
}
export interface ExecutionResult {
    action: OptimizationAction;
    success: boolean;
    benefit?: number;
    executionTime: number;
    timestamp: Date;
}
export interface PolicyAdaptationResult {
    adaptations: PolicyAdaptation[];
    totalAdaptations: number;
    learningRate: number;
    policyImprovement: number;
    timestamp: Date;
}
export interface PolicyAdaptation {
    id: string;
    type: AdaptationType;
    description: string;
    parameters: any;
    confidence: number;
    effectiveness: number;
}
export declare enum AdaptationType {
    PARAMETER_TUNING = "parameter_tuning",
    THRESHOLD_ADJUSTMENT = "threshold_adjustment",
    ALGORITHM_UPDATE = "algorithm_update",
    MODEL_RETRAINING = "model_retraining"
}
export interface FeedbackLoopResult {
    performanceFeedback: any;
    systemFeedback: any;
    userFeedback: any;
    analysis: any;
    recommendations: any[];
    learningApplied: boolean;
    timestamp: Date;
}
export interface OptimizationAnalysis {
    successfulActions: ExecutionResult[];
    failedActions: ExecutionResult[];
    totalBenefit: number;
    patterns: any[];
    learnings: any[];
}
export default RealTimeRANOptimizationStreams;
//# sourceMappingURL=ran-optimization-streams.d.ts.map